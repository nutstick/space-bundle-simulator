
//This shader is part magic, part luck
//so it stays uncommented for now

precision mediump float;

#define M_PI 3.1415926535897932384626433832795 //not enough digits


uniform sampler2D defSampler;
uniform sampler2D bgSampler;

uniform float time;
uniform vec2 resolution;
uniform float R;
uniform float beta;
uniform float gamma;
uniform float viewrot;

const float tanfov = 3.;

vec3 rotate(const vec3 v, float theta, const vec3 axis) {
	float cosTheta = cos(theta);
	return  v * cosTheta + cross(axis, v) * sin(theta) + axis * dot(v, axis) * (1.0 - cosTheta);
}

vec4 stripes(vec3 view, float horizonflag) { //argument must be normalized

	return vec4(horizonflag * step(fract(5.*atan(view.z,view.x)),.8) * step(fract(5.*acos(view.y)),.8) * vec3(1.,-view.y,view.y), 1.) ;
}

vec3 aberrate(vec3 original)
{
	return vec3(-beta * length(original) + gamma * original.x, original.yz );
}

vec4 starfield(vec3 view, float horizonflag) {
	float latitude = acos(view.y)/M_PI;
	float longitude = atan(view.z,view.x)/(2.0*M_PI);

	return min(
		texture2D( bgSampler, vec2(longitude,latitude)),
		vec4(horizonflag*vec3(1.,1.,1.),1.)
		);
}


const float textureSize = 512.0;
const float texelSize = 1.0 / textureSize;

vec4 texture2DInterp( sampler2D textureSampler, vec2 uv ) //not actually used right now
{
    vec4 tl = texture2D(textureSampler, uv);
    vec4 tr = texture2D(textureSampler, uv + vec2(texelSize, 0));
    vec4 bl = texture2D(textureSampler, uv + vec2(0, texelSize));
    vec4 br = texture2D(textureSampler, uv + vec2(texelSize , texelSize));
    vec2 f = fract( uv.xy * textureSize ); // get the decimal part
    vec4 tA = mix( tl, tr, f.x ); // will interpolate the red dot in the image
    vec4 tB = mix( bl, br, f.x ); // will interpolate the blue dot in the image
    //return mix( tA, tB, f.y ); // will interpolate the green dot in the image
    float st = smoothstep(0.,1.,f.y);
    return tA*(1.0-st) + st*tB;
}

void main() {

    //get screen coords
    vec2 uvscr = gl_FragCoord.xy / resolution;
    vec2 uv = (uvscr - 0.5) * vec2(1.,resolution.y/resolution.x);

    uv *= tanfov;


    vec3 uv3 = normalize( aberrate( rotate( vec3(uv, -1.0),viewrot,vec3(0,1,0)   )));

    float theta = acos(dot(uv3,vec3(0,0,-1)));

    //float dphi = 2./(R*sin(theta));
	//small-angle approximation
    //float Phi_sa =  M_PI - (theta - dphi);

    vec2 params = vec2( (R-1.0)/9.0,  1. - theta /M_PI );

    vec4 distcolor = texture2D(defSampler,params);

				// VVV why we should have a .98 here will forever be a mistery
    float Phi_ba =  2.* M_PI  * (0.98*distcolor.r+0.1*(distcolor.g));


    float Phi = Phi_ba; //(1.-step(theta,1.0))*Phi_sa + (step(theta,1.0))*Phi_ba;


    vec3 v3 = -normalize(cross(vec3(0,0,-1),uv3));

    uv3 = rotate(vec3(0,0,R), Phi, v3);


    float nothorizon =  max(
				smoothstep(0.,0.05,texture2D(defSampler,params).r) * (1.-step(theta,0.01)) ,
				(1.-step(theta,1.57))
				);

    uv3 = rotate(uv3, time * 0.0015, vec3(0., 1., 0.));

    //vec4 color = textureCube(iChannel0, cubeTexCoord);
    vec4 color = starfield(normalize(uv3), nothorizon);

    gl_FragColor = color;
    //gl_FragColor = texture2DInterp(bgSampler,(uv)*0.1);	//DEBUG: test uv
    //gl_FragColor = vec4(theta * vec3(1.,1.,1.),1.);		//DEBUG: test theta
   // gl_FragColor = vec4(Phi/(2.*M_PI) * vec3(1.,1.,1.),1.);	//DEBUG: test Phi

}

//
//
//
//  Created by Сергей on 13.03.17.
//
//

#include <stdio.h>
#include <math.h>
#include <stdio.h>
#include <stdlib.h>



double u_0_x(double x){
	return 0.5*(1 - x * x);
}


int main(){
	double h = 0.001;
	double tau = 0.000001;
	double alpha = 1.0;
	int sz_x = 1001;
	int sz_t = 1000001;

	double* u;
	double* b;
	double* c;
	double* d;
	double* e;
	double* u_next;
	int m;

	u = (double *)malloc(sz_x * sizeof(double)); // current lay
	u_next = (double *)malloc(sz_x * sizeof(double)); // upper lay
	FILE *res = fopen("implicit.txt","w"); // file with results
	for(int m = 0; m < sz_x; m++){
		u[m] = u_0_x(m * h); // filling first lay when t = 0
	}

	for(int n = 0; n < sz_t; n++){

		e = (double *)malloc((sz_x - 1) * sizeof(double)); // up_diag
		c = (double *)malloc((sz_x - 1) * sizeof(double)); // low_diag
		d = (double *)malloc((sz_x) * sizeof(double));	// main_diag
		b = (double *)malloc((sz_x) * sizeof(double)); // right column

	//filling b,c,d,e
		b[0] = 0; 	//b[sz_x - 1] = -u[sz_x-1] * u[sz_x-1]  * h;

		e[0] = -1.; 	

		d[0] = 1.; d[sz_x - 1] = 1.;

		//c[sz_x - 2] =  -1.;

		for(m = 1; m < sz_x - 1; m++){
			b[m] = u[m] / tau + u[m] * alpha + 1;
			d[m] = 1. / tau + 2. / (h * h) + 1. /(m*h*h);
		}

		for(m = 1; m < sz_x - 1; m++){
			e[m] = -1. / (h * h) - 1./(m*h*h);
		}

		for(m = 0; m < sz_x - 2; m++){
			c[m] = -1. / (h * h);
		}

		double par; // par of shuttle
		for(m = 1; m < sz_x; m++){
			par = c[m - 1] / d[m - 1];
			d[m] -= par * e[m - 1];
			b[m] -= par * b[m - 1];
		}

		u_next[sz_x-1] = b[sz_x-1] / d[sz_x-1]; // calculating last u^

		for(int i = sz_x-2; i >= 0; i--){
			u_next[i] = (b[i] - e[i] * u_next[i+1]) / d[i];	// calculating u^ by next
		}

		for(int k = 0; k < sz_x; k++){
			u[k] = u_next[k]; // swap current lay with next
		}

	}

	fprintf(res, "t = %lf  \n", sz_t * tau - tau); // print time
	for(int m = 0; m < sz_x ; m++){		
		fprintf(res, "%lf \t %lf \n", m * h, u_next[m]); // print (x, u(x,t))

	}

	fclose(res);

	return 0;
}

#include <iostream>
using namespace std;

// Global Constants
const int LOWERLIMIT = 0;
const int UPPERLIMIT = 12;

// function prototype
//Raises n to the kth power and returns the result
int RaiseIntToPower(int n, int k);

int main()
{
	int n; 

	// cout << "    |   2 |   N\n"
	printf("     |   2 |   N\n");
	printf("  N  |  N  |  2\n ");
	printf("----+-----+------\n");

	for (n = LOWERLIMIT; n <= UPPERLIMIT;n++)
	{
		//print a row of the table
		printf(" %2d  | %3d | %4d\n", n , RaiseIntToPower(n,2), RaiseIntToPower(2,n));
	}
	  
	printf("\n");

	return 0;

}

//Function code

int RaiseIntToPower(int n, int k)
{
	int i, result;
	result = 1;

	for (i= 0; i<k ; i++)
	{
		result = result * n;
		// Result *= n;

	}

	return result;
}
#include <iostream>
using namespace std;

const int MAX = 3;
void MyFunction(const int myarray[]);

int main()
{
	int nums[MAX] = { 40, 76, 93 };
	MyFunction(nums);

	return 0;
}

void MyFunction(const int myarray[])
{
	for (int x = 0; x < MAX; x++);
	{
		myarray[x] = 0;
	}
}
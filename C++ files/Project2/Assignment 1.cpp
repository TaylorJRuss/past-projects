// This program adds two large integers, and prints the result to the screen

#include <cctype>
#include <iostream>
using namespace std;

// Max number of digits in the large integer
const int MAXSIZE = 25;

// Initializes an integer array so that all positions are holding the value zero.
void initArray(int array[]);

// Gets a large integer from the keyboard and stores each individual digit
// into the array.
void getNum(int array[]);

// Prints a large integer to the screen. Leading zeros are not printed.
void printNum(int array[]);


int main()
{
	// TODO: Write code for the main function
	int list1[MAXSIZE];	
	int list2[MAXSIZE];	
	int Total[MAXSIZE];	
	int carry = 0;	
	int store = 0;	
	bool IntOver = false;
	do
	{
		// Initializing arrays and storing user input into arrays.
		initArray(list1);
		initArray(list2);
		initArray(Total);
		getNum(list1);
		getNum(list2);

		for (int i = MAXSIZE - 1; i >= 0; i--)
		{
			store = list1[i] + list2[i] + carry;
			carry = store / 10;
			store = store % 10;
			Total[i] = store;
		}

		// Check if sum is too large and print sum to screen.
		if (carry != 0)
		{
			printf("The Integer overflowed! Too Bad! \n");
			IntOver = true;
		}
		else
		{
			IntOver = false;
			printf("The Total number is: ");
			printNum(Total);
		}
	} while (IntOver == true);

	cout << endl;
	return 0;
}


void initArray(int array[])
{
	// TODO: Write code for the function
	for (int x = 0; x < MAXSIZE; x++)
	{
		array[x] = 0;
	}
}


void printNum(int array[])
{
	// TODO: Write code for the function
	bool FirstZero = true;
	for (int i = 0; i < MAXSIZE; i++)
	{
		if (FirstZero == true)
		{
			if (array[i] != 0)
			{
				FirstZero = false;
			}
		}
		if (FirstZero == false)
		{
			cout << array[i];
		}
	}
	cout << endl;
}


void getNum(int array[])
{
	char input[MAXSIZE + 1];
	int length;
	bool inputOkay;

	do
	{
		inputOkay = true;

		cout << "Enter an integer: ";
		cin.getline(input, MAXSIZE + 1);

		// If user entered more than the max number of digits
		// then make them enter the large integer again
		while (cin.fail())
		{
			cin.clear();
			cin.ignore(numeric_limits<streamsize>::max(), '\n');
			cout << "Integer too long\n";
			cout << "Enter an integer: ";
			cin.getline(input, MAXSIZE + 1);
		}

		// Check to ensure that the user did not enter any non-digit values
		length = strlen(input);
		for (int x = 0; x < length && inputOkay; x++)
		{
			if (!isdigit(input[x]))
			{
				inputOkay = false;
				cout << "Invalid input\n";
			}
		}

	} while (!inputOkay);


	// TODO: Write code for the remaining portion of the function
	bool Start = false; 
	int Count = MAXSIZE - 1;

	for (int i = MAXSIZE; i >= 0; i--)
	{
		if (Start == true)
		{
			array[Count] = input[i] - 48;
			Count--;
		}
		if (input[i] == 0)
		{
			Start = true;
		}
	}

}
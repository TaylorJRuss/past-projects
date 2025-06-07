// This program demonstrates creating and using an array of student structures

#include <iostream>
using namespace std;

struct Student
{
	char name[6];
	double gpa;
	int hours;
};

// Displays the contents of stu to the screen; one line per field
void printStudent(const Student& stu);

int main()
{
	const int MAXSIZE = 50;

	Student stuList[MAXSIZE];

	// Fill up position 0 in the array with the first student's info
	stuList[0].gpa = 3.7;
	stuList[0].hours = 46;
	snprintf(stuList[0].name, sizeof(stuList[0].name), "John");

	// Fill up position 1 in the array with the first student's info
	stuList[1].gpa = 3.9;
	stuList[1].hours = 24;
	snprintf(stuList[1].name, sizeof(stuList[1].name), "Becky");

	// Print all of student 0's information to the screen
	cout << "Student 0:\n";
	printStudent(stuList[0]);

	// Print all of student 1's information to the screen
	cout << "\nStudent 1:\n";
	printStudent(stuList[1]);

	// For student 0, print the 3rd character in their name
	cout << endl << stuList[0].name[2] << endl;

	return 0;
}

void printStudent(const Student& stu)
{
	cout << stu.name << endl;
	cout << stu.gpa << endl;
	cout << stu.hours << endl;
}
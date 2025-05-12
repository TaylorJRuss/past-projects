package input;

import java.util.Scanner;

public class bankDemo {

	public static void main(String[] args) {
	bankAccount A1 = new bankAccount("001", "Ryder");
	Scanner myInput = new Scanner(System.in);
	System.out.println("Please enter you name: ");
	String enterName;
	enterName = myInput.next();
	System.out.println("Enter amount of money currently in the account: ");
	double money;
	money=myInput.nextDouble();
	System.out.println("What would you like to do? deposit:1, widthdraw:2  enter 3 to exit.");
	System.out.print("your current balance is: ");
	A1.deposit(money);
	
	int a=0, x=0;
	a = myInput.nextInt();
	
while (x==0)
{
	
		if (a ==1)
		{
			System.out.println("How much money would you like to deposit into " + enterName + "'s account?: ");
			double num;
			num = myInput.nextDouble();
			System.out.print("Your new total Balance is: ");
			A1.deposit(num);
			System.out.println(" next: ");
			a = myInput.nextInt();
		}
		else if (a==2)
		{
			System.out.println("How much money would you like to withdraw from " + enterName + "'s account?: ");
			double num;
			num = myInput.nextDouble();
			System.out.print("Your new total Balance is: ");
			A1.withdraw(num);
			System.out.print(" next: ");
			a = myInput.nextInt();
			
		}
		else if (a==3)
		{
			double num=0;
			String Ident = "001";
			System.out.print(enterName + "'s New total is: ");
			A1.deposit(num);
			System.out.print("Customer ID:" + Ident);
			x=1;
		}
		else
		{
			System.out.print("Option not avaliable. Try again: ");
			a = myInput.nextInt();
		}
}	
myInput.close();
	}
}

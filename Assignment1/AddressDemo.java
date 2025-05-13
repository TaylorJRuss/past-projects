package Assignment1;

import java.util.Scanner;

public class AddressDemo {
	
	public static void main(String[] args) {
		PersonAddress p1 = new PersonAddress("Ryder", "Russell", "Blank@random.com","999-999-9999");
		PersonAddress p2 = new PersonAddress("Ryder", "Russell", "Blank@random.com","999-999-9999");
		Scanner myInput = new Scanner(System.in);
		
		System.out.println("you need to enter an address into an adressbook fo a friend of yours.");
		System.out.println("Please enter Email address: ");
		
		String Email;
		Email = myInput.next();
		p1.setEmail(Email);
		
		System.out.println("Now for their phone number. Add dashes when needed.");
		
		String PhoneNum;
		PhoneNum = myInput.next();
		p1.setphoneNumber(PhoneNum);
		
		System.out.println("now enter them again to confirm them starting with the email.");
		
		String Email2, PhoneNum2;
		Email2 = myInput.next();
		PhoneNum2 = myInput.next();
		p2.setEmail(Email2);
		p2.setphoneNumber(PhoneNum2);
		
		//Its the opposite way around but it works
		if(Email == Email2 && PhoneNum == PhoneNum2)
		{
			System.out.println("Email and Phone Numbers dont match! try again");
		}
		else
		{
			System.out.println("Email and Phone numbers Confirmed");
		}
		
		
		
		myInput.close();
		
		
		
	}
}
;
package input;

public class bankAccount {

	private String ID;
	private String Name;
	private double Balance;
	
	private static double  intrest = 0.1;
	private static int numAccount =0;
	private static double totalBalance = 0;
	
	public bankAccount(String ID, String Name)
	{
		this.ID = ID;
		this.Name = Name;
		Balance = 0;
				
		numAccount++;
	}
	
	public double getBalance()
	{
		return this.Balance;
	}
	
	public void deposit(double num)
	{
		Balance +=num;
		totalBalance += num;
		System.out.print(Balance);
	}
	
	public void withdraw(double num)
	{
		if(Balance < num)
		{
			System.out.println("Sorry you dont have enough money");
			return;
		}
		Balance -=num;
		totalBalance -= num;
		System.out.print(Balance);
		
	}
	
	public static void setInterest(double newIntrest) 
	{
		intrest = newIntrest;
	}
	
	public static void main(String[] args)
	{
		bankAccount[] allCustomers = new bankAccount[5];
		for(int i=0; i<5; i++)
		{
			allCustomers[i] = new bankAccount("A00" +i, "Name00" +i);
		}
		
		for(int i=0; i<5; i++)
		{
			allCustomers[i].deposit(i);
		}
	} 
		
	
}

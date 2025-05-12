package input;

public class Bank {
	private static double  intrest = 0.1;
	private static int numAccount =0;
	private static double totalBalance = 0;
	
	public static void addAccount() 
	{
		numAccount++;
	}
	
	public static void updateBalance(double num)
	{
		totalBalance += num;
	}
}

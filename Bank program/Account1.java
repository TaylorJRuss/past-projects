package input;

public class Account1 {
	private String ID;
	private String Name;
	private double Balance;
	
	public Account1(String ID, String Name)
	{
		this.ID = ID;
		this.Name = Name;
		Balance = 0;
		
		Bank.addAccount();
	}
	
	public double getBalance()
	{
		return this.Balance;
	}
	public String getName()
	{
		return this.Name;
	}
	public String Indentify()
	{
		return this.ID;
	}
}

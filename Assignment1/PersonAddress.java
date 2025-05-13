package Assignment1;

public class PersonAddress {
	private String firstName;
	private String lastName;
	private String Email;
	private String phoneNumber;
	
	public PersonAddress()
	{
		firstName = "First";
		lastName = "Last";
		Email = "Blank@random.com";
		phoneNumber= "999-999-9999";
	}
	
	public PersonAddress(String firstName, String lastName, String Email, String phoneNumber)
	{
		this.firstName=firstName;
		this.lastName=lastName;
		this.Email=Email;
		this.phoneNumber = phoneNumber;
	}
	
	public String getfirstName()
	{
		return this.firstName;
	}
	
	public String getlastName()
	{
		return this.lastName;
	}
	
	public void setEmail(String Email)
	{
		this.Email = Email;
	}
	
	public String getEmail()
	{
		return this.Email;
	}
	
	public void setphoneNumber( String phoneNumber)
	{
		this.phoneNumber = phoneNumber;
	}
	
	public String getphoneNumber()
	{
		return this.phoneNumber;
	}
	
	
}

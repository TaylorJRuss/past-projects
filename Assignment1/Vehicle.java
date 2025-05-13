package Assignment1;

public class Vehicle {
	private String Manufacturer;
	private int Cylynders;
	private String Owner;
	
	public Vehicle()
	{
		Manufacturer = "Unknown";
		Cylynders=0;
		Owner="Unknown";
	}
	
	public Vehicle(String Manufacturer, int Cylynders, String Owner)
	{
		this.Manufacturer = Manufacturer;
		this.Cylynders=Cylynders;
		this.Owner=Owner;
	}
	
	public void Display()
	{
		System.out.println("The Manufacturer is: " + Manufacturer);
		System.out.println("There are " + Cylynders + " Cylynders");
		System.out.println("the owner is: " + Owner);
	}

}

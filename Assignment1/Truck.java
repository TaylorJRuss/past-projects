package Assignment1;

public class Truck extends Vehicle {

	private double loadCapacity;
	private double towCapacity;
	
	public Truck()
	{
		super();
		loadCapacity = 0.0;
		towCapacity=0.0;
	}
	
	public Truck(String Manufacturer, int Cylynders, String Owner, double loadCapacity, double towCapacity)
	{
		super(Manufacturer, Cylynders, Owner);
		this.loadCapacity = loadCapacity;
		this.towCapacity=towCapacity;
	}
	
	public void Display()
	{
		super.Display();
		System.out.println("The trucks Load capacity is: "+ loadCapacity + " Tons");
		System.out.println("The trucks tow capacity is: " + towCapacity + " Tons");
	}
}
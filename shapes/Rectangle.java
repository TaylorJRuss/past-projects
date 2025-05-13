package shapes;

public class Rectangle implements Shapes {

	private double length;
	private double height;
	
	public Rectangle()
	{
		//height =1;
		//length =1;
		this(1,1);
	}
	public Rectangle(double height, double length)
	{
		this.height = height;
		this.length = length;
		
	}
	
	public  void setRectangle(double height, double length)
	{
		this.height = height;
		this.length = length;
		
	}
	
	public double getArea()
	{
		return height*length;
	}
	
	public double getPerimiter()
	{
		return 2*(height+length);
	}
}

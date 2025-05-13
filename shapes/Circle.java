package shapes;

public class Circle implements Shapes 
{
	private double radius;
	
	public Circle()
	{
		//radius = 1;
		this(1);
	}
	
	public Circle (double radius)
	{
		this.radius=radius;
	}
	
	public void setCircle (double radius)
	{
		this.radius=radius;
	}
	
	public double getArea()
	{
		return 3.14* Math.pow(radius, 2);
	}
	
	public double getPerimiter()
	{
		return 2* 3.14 * radius;
	}
}

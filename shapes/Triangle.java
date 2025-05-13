package shapes;

public class Triangle implements Shapes {
	private double a;
	private double b;
	private double c;
	private double s;
	
	public Triangle()
	{
	 this(1, 1, 1);
	}
	
	public Triangle(double a, double b, double c)
	{
		this.a=a;
		this.b=b;
		this.c=c;
		this.s = (a+b+c)/2;
		
	}
	
	public void setTriangle(double a, double b, double c)
	{
		this.a=a;
		this.b=b;
		this.c=c;
		this.s = (a+b+c)/2;
		
	}
	
	public double getArea()
	{
		return Math.sqrt(s*(s-a)*(s-b)*(s-c));
	}
	

	public double getPerimiter()
	{
		return a+b+c;
	}
}

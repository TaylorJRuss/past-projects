package shapes;

import java.util.Random;
public class ManyShapes {

	public static void main(String[] args) {
		int num;
		double height, length;
		double a,b,c;
		double radius;
		Random random = new Random();
		Rectangle R1=new Rectangle(0.0,0.0);
		Triangle T1 = new Triangle(0.0,0.0,0.0);
		Circle C1 = new Circle(0.0);
		
		
		
		for(int j=1; j<=30; j++)
		{
			num = random.nextInt(3);
		
			System.out.print("Shape #" + j + " is " );
			if(num == 0)
			{
				System.out.println("a Rectangle");
				height= (int)(Math.random() * 100 + 1);
				length= (int)(Math.random() * 100 + 1);
				R1.setRectangle(height, length);
				System.out.println("The area is: "+ R1.getArea());
				System.out.println("The perimiter is: " + R1.getPerimiter());
				
			}
			else if (num ==1)
			{
				System.out.println("a Triangle");
				a=(int)(Math.random() * 100 + 1);
				b=(int)(Math.random() * 100 + 1);
				c=(int)(Math.random() * 100 + 1);
				T1.setTriangle(a, b, c);
				System.out.println("The area is: "+ T1.getArea());
				System.out.println("The perimiter is: " + T1.getPerimiter());
			}
			else if (num ==2)
			{
				System.out.println("a circle");
				radius=(int)(Math.random() * 100 + 1);
				C1.setCircle(radius);
				System.out.println("The area is: "+ C1.getArea());
				System.out.println("The perimiter is: " + C1.getPerimiter());
				
			}
		}

	}

}

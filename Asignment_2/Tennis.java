package Asignment_2;

public class Tennis extends AthleteInfo {
	private int ServeSpeed;
	private int forehand;
	private int backhand;
	
	public Tennis()
	{
		super();
		ServeSpeed = 0;
		forehand =0;
		backhand=0;
	}
	
	public Tennis(String name, String BannerID, String major, int age, int ServeSpeed, int forehand, int backhand)
	{
		super(name,BannerID, major, age);
		this.ServeSpeed = ServeSpeed;
		this.forehand = forehand;
		this.backhand = backhand;
	}
	
	public void setServeSpeed(int ServeSpeed)
	{
		this.ServeSpeed = ServeSpeed;
	}
	 public int getServeSpeed()
	 {
		 return this.ServeSpeed;
	 }
	
	 public void setforehand(String forehand)
	 {
		 this.forehand=forehand;
	 }
	 
	 public int getforehand()
	 {
		 return this.forehand;
	 }
	 
	 public void setbackhand(String backhand) 
	 {
		 this.backhand = backhand;
	 }
	 
	 public int getbackhand()
	 {
		 return this.backhand;
	 }
	 
	 public void display()
	 {
		 super.display();
		 System.out.println("Serve speed: "+ServeSpeed);
		 System.out.println("Forehand rating: "+ forehand+ "/10");
		 System.out.println("Backhand Rating: "+ backhand+ "/10");
		 
	 }
	
	

}

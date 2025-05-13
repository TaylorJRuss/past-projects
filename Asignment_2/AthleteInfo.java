package Asignment_2;

public class AthleteInfo {
	private String name;
	private String BannerID;
	private String major;
	private int age;
	
	public AthleteInfo()
	{
		name = "NA";
		BannerID="NA";
		major = "Undetermined";
		age = 0;
	}
	
	public AthleteInfo(String name, String BannerID, String major, int age)
	{
		this.name = name;
		this.BannerID = BannerID;
		this.major=major;
		this.age = age;

	}
	 public void setName(String name)
	 {
		 this.name=name;
	 }
	 
	 public String getName()
	 {
		 return this.name;
	 }
	 
	 public void setBannerID(String BannerID) 
	 {
		 this.BannerID = BannerID;
	 }
	 
	 public String getBannerID()
	 {
		 return this.BannerID;
	 }
	 
	 public void setMajor(String major)
	 {
		 this.major = major;
	 }
	 
	 public String getMajor()
	 {
		 return this.major;
	 }
	 
	 public void setAge(int age)
	 {
		 this.age=age;
	 }
	 
	 public int getAge()
	 {
		 return this.age;
	 }
	 
	 public void display()
	 {
		 System.out.println("Name: " + name);
		 System.out.println("BannerID: XXXXXX"+ BannerID);
		 System.out.println("Age: "+age);
		 System.out.println("Major: "+major);
	 }
}

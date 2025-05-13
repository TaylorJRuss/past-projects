package Asignment_2;

public class TennisTeam 
{
	  private Tennis[] athletes;
	  private int capacity=15; 
	  private int size; 

	  public TennisTeam(int capacity) 
	  {
	    athletes = new Tennis[capacity];
	    this.capacity = capacity;
	    size = 0;
	  }
	  public void displayAll() 
	  {
	    for (int i = 0; i < size; i++) {
	      System.out.println("Athlete " + (i + 1) + ":");
	      athletes[i].display();
	      System.out.println();
	    }
	  }

	  public void addAthlete(Tennis athlete) 
	  {
	    if (size == capacity)
	    {
	      System.out.println("The team is full. Cannot add more athletes.");
	      return;
	    }
	    athletes[size] = athlete;
	    size++;
	    System.out.println("Added " + athlete.getName() + " to the team.");
	  }

	  public void removeAthlete(String bannerID)
	  {
	    for (int i = 0; i < size; i++) {
	      if (athletes[i].getBannerID().equals(bannerID)) 
	      {
	        String name = athletes[i].getName();
	        for (int j = i; j < size - 1; j++) {
	          athletes[j] = athletes[j + 1];
	        }
	        size--;
	        System.out.println( name + " has been removed from the team.");
	        return;
	      }
	    }
	    System.out.println("No athlete with the given BannerID found in the team.");
	  }
}


package Asignment_2;

public class Test {
	public static void main(String[] args) {
	    TennisTeam team = new TennisTeam(5);
	    Tennis a1 = new Tennis("Alice", "1234", "Computer Science",19, 120, 8, 7);
	    team.addAthlete(a1);
	    Tennis a2 = new Tennis("Ryder", "5678", "Mathematics", 20, 130, 9, 6);
	    team.addAthlete(a2);
	    Tennis a3 = new Tennis("Charlie", "6789", "Physics", 21, 140, 7, 8);
	    team.addAthlete(a3);
	    team.displayAll();
	    System.out.println();
	    System.out.println("The team is now: ");
	    team.removeAthlete("6789");
	    team.displayAll();
	  }
}

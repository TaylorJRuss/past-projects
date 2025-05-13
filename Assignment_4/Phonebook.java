package Assignment_4;
import java.util.HashMap;

public class Phonebook 
{
	private HashMap<String, String> contacts;
	private int count=0;
	
	  public Phonebook() 
	  {
	        contacts = new HashMap<>();
	  }
	  
	  public void add(String name, String phoneNumber) {
	        if (!contacts.containsKey(name)) {
	            contacts.put(name, phoneNumber);
	            System.out.println("Contact added!");
	            count++;
	        } 
	        else 
	        {
	            System.out.println("That Contact already exists.");
	        }
	  }
	  
	  public void remove(String name) 
	  {
	        if (contacts.containsKey(name)) 
	        {
	            contacts.remove(name);
	            System.out.println("Contact deleted!");
	            count--;
	        } 
	        else 
	        {
	            System.out.println("Contact not found.");
	        }
	        
	        
	  }
	  
	  public String getValue(String name) 
	  {
	        return contacts.getOrDefault(name, "Phone number not found.");
	  }
	  
	  public boolean isEmpty() {
	        return contacts == null;
	    }
	  
	  public int getSize() {
		  return count;
	  }

	  public static void main(String[] args) 
	  {
	        Phonebook phoneBook = new Phonebook();

	        // Example usage:
	        phoneBook.add("Allison", "123-456-7890");
	        phoneBook.add("Steve", "947-6545-3876");

	        System.out.println("Allison's phone number: " + phoneBook.getValue("Allison"));
	        System.out.println("Steve's phone number: " + phoneBook.getValue("Steve"));
	        System.out.println("the total size is: "+ phoneBook.count);
	        phoneBook.remove("Allison");
	        System.out.println("Allison's phone number: " + phoneBook.getValue("Allison"));
	        System.out.println("the total size is: "+ phoneBook.count);
	  }
}

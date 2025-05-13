package Assignment1;

public class SelectSort {

	public static void SelectionSort(int[] numbers)
	{
		for(int i = 0; i<10; i++)
		{
			 int index = i;  
	            for (int j = i + 1; j < numbers.length; j++)
	            {  
	                if (numbers[j] < numbers[index]){  
	                    index = j;
	                }  
	            }  
	            int small = numbers[index];   
	            numbers[index] = numbers[i];  
	            numbers[i] = small;  
		}
		
		
	}
	
	
	public static void main(String[] args)
	{
		int Array[] = {0,1,2,3,4,5,6,7,8,9};
		
		for(int i=0; i<10; i++)
		{
			int randomNum = (int)(Math.random()*(200-100+1)+100);
			Array[i]= randomNum;
		}
		
		System.out.println("Before: ");
		for(int i=0; i<10;i++)
		{
			
			System.out.print(Array[i] + " ");
		}
		
		SelectionSort(Array);
		
		System.out.println();
		System.out.println("After: ");
		for(int i=0; i<10;i++)
		{
			
			System.out.print(Array[i] + " ");
		}
	}

}


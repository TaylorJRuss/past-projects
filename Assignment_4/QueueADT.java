package Assignment_4;

public class QueueADT {

	private QNode head;
	private QNode tail;
	
	public QueueADT() {
        head = null;
        tail = null;
    }

    public boolean isEmpty() {
        return head == null;
    }
	
    public void enQueue(int element) {
    	
    	QNode newNode = new QNode(element); 
    	if(isEmpty()) 
    	{
    		head = newNode;
    		tail= newNode;
    	}
    	else
    	{
    		tail.next = newNode;
    		tail = newNode;
    	}
    }
	
    public int deQueue() {
        if (isEmpty())
        {
            System.out.println("The Queue is empty. Too bad");
            return -1; 
        } 
        else 
        {
            int BadInt = head.data;
            head = head.next;
            if (head== null) 
            {
                tail = null;
            }
            return BadInt;
        }
    }
    
    public void display() {
        QNode current = head;
        while (current != null) 
        {
            System.out.print(current.data + " ");
            current = current.next;
        }
        System.out.println();
    }

	public static void main(String[] args) {
		 QueueADT myQueue = new QueueADT();

	        // Enqueue some elements
	        myQueue.enQueue(10);
	        myQueue.enQueue(20);
	        myQueue.enQueue(30);

	        System.out.print("What is in the Queue: ");
	        myQueue.display();
	        
	        int dequeuedValue = myQueue.deQueue();
	        System.out.println("The Dequeued value was: " + dequeuedValue);
	        
	        System.out.print("What is in the Queue now: ");
	        myQueue.display();
	    }
	}



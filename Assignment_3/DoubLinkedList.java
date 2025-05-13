package Assignment_3;

public class DoubLinkedList {
	
	
	private Node3 head;
    private Node3 tail;
    private int size;
    
    
    public void insert(int a) {
        Node3 newNode = new Node3(a);
        if (head == null) {
            head = tail = newNode;
        } else {
            Node3 current = head;
            while (current != null && current.data < a) {
                current = current.next;
            }
            if (current == null) {
            
                tail.next = newNode;
                newNode.prev = tail;
                tail = newNode;
            } else {
               
                if (current.prev != null) {
                    current.prev.next = newNode;
                    newNode.prev = current.prev;
                } else {
                    head = newNode;
                }
                newNode.next = current;
                current.prev = newNode;
            }
        }
        size++;
    }

    public void remove(int a) {
        Node3 current = head;
        while (current != null && current.data != a) {
            current = current.next;
        }
        if (current == null) {
            throw new IllegalArgumentException("Value " + a + " not found in the list.");
        }
        if (current.prev != null) {
            current.prev.next = current.next;
        } else {
            head = current.next;
        }
        if (current.next != null) {
            current.next.prev = current.prev;
        } else {
            tail = current.prev;
        }
        size--;
    }

    public void merge(DoubLinkedList otherList) {
        Node3 otherCurrent = otherList.head;
        while (otherCurrent != null) {
            insert(otherCurrent.data);
            otherCurrent = otherCurrent.next;
        }
    }

    public boolean contains(int a) {
        Node3 current = head;
        while (current != null) {
            if (current.data == a) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    public int getLength() {
        return size;
    }

    public void clear() {
        head = tail = null;
        size = 0;
    }
    
    public boolean isEmpty() {
        return size == 0;
    }

    public String toString() {
        StringBuilder sb = new StringBuilder();
        Node3 current = head;
        while (current != null) {
            sb.append(current.data).append(" ");
            current = current.next;
        }
        return sb.toString().trim();
    }

    public static void main(String[] args) {
        DoubLinkedList list = new DoubLinkedList();
        
        // Testing method
        list.insert(65);
        list.insert(5);
        list.insert(27);
        list.insert(95);

        System.out.println("The Sorted List: " + list);
        System.out.println("D0es the list Contain the number 27? " + list.contains(27));
        System.out.println("The list is " + list.getLength()+ " numbers long.");

        list.remove(5);
        System.out.println("The list after removing 5: " + list);
    }
}
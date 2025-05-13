package JVCS;
import java.util.*;
import java.util.Stack;

public class myVCS {
    private Stack<Action> history;
    private Map<String, Stack<Action>> branches;
    private String currentBranch;
    private boolean currentState;
    private static final String[] USERS = {"Taylor", "Owen", "Jeremiah"};
    private String currentUser;

    public myVCS() {
        history = new Stack<>();
        branches = new HashMap<>();
        currentBranch = "main";
        branches.put(currentBranch, history);
        currentState = false; // Initial state is off
    }

    public void toggle() {
        history.push(new Action(currentUser, currentState));
        currentState = !currentState;
        System.out.println(currentUser + " turned the light " + (currentState ? "ON" : "OFF"));
    }

    public void undo() {
        if (!history.isEmpty()) {
            Action lastAction = history.pop();
            currentState = lastAction.state;
            System.out.println("Reverted to previous state: " + (currentState ? "ON" : "OFF") + " by " + lastAction.user);
        } else {
            System.out.println("No previous state to revert to.");
        }
    }

    public void displayHistory() {
        System.out.println("History of light switch states:");
        for (Action action : history) {
            System.out.println(action.user + " turned the light " + (action.state ? "ON" : "OFF"));
        }
    }

    public void chooseUser() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Choose a user:");
        for (int i = 0; i < USERS.length; i++) {
            System.out.println((i + 1) + ". " + USERS[i]);
        }
        int choice = scanner.nextInt();
        scanner.nextLine(); // Consume newline
        if (choice > 0 && choice <= USERS.length) {
            currentUser = USERS[choice - 1];
            System.out.println("Current user: " + currentUser);
        } else {
            System.out.println("Invalid choice. Defaulting to " + USERS[0]);
            currentUser = USERS[0];
        }
    }

    // Branch Handling Methods
    public void createBranch(String branchName) {
        if (branches.containsKey(branchName)) {
            System.out.println("Branch already exists.");
        } else {
            branches.put(branchName, new Stack<>());
            System.out.println("Branch " + branchName + " created.");
        }
    }

    public void deleteBranch(String branchName) {
        if (branches.containsKey(branchName) && !branchName.equals(currentBranch)) {
            branches.remove(branchName);
            System.out.println("Branch " + branchName + " deleted.");
        } else {
            System.out.println("Cannot delete the current branch or non-existent branch.");
        }
    }

    public void checkoutBranch(String branchName) {
        if (branches.containsKey(branchName)) {
            currentBranch = branchName;
            history = branches.get(branchName);
            System.out.println("Checked out to branch " + branchName);
        } else {
            System.out.println("Branch does not exist.");
        }
    }

    public void mergeBranches(String targetBranch) {
        if (branches.containsKey(targetBranch)) {
            Stack<Action> targetHistory = branches.get(targetBranch);
            targetHistory.addAll(history);
            System.out.println("Merged current branch into " + targetBranch);
        } else {
            System.out.println("Target branch does not exist.");
        }
    }

    private class Action {
        String user;
        boolean state;

        Action(String user, boolean state) {
            this.user = user;
            this.state = state;
        }
    }

    public static void main(String[] args) {
        myVCS vcs = new myVCS();
        Scanner scanner = new Scanner(System.in);

        vcs.chooseUser();

        while (true) {
            System.out.println("\nChoose an action:");
            System.out.println("1. Toggle light switch");
            System.out.println("2. Undo last action");
            System.out.println("3. Display history");
            System.out.println("4. Switch user");
            System.out.println("5. Create branch");
            System.out.println("6. Delete branch");
            System.out.println("7. Checkout branch");
            System.out.println("8. Merge branches");
            System.out.println("9. Exit");
            System.out.print("Enter your choice: ");
            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume newline

            switch (choice) {
                case 1:
                    vcs.toggle();
                    break;
                case 2:
                    vcs.undo();
                    break;
                case 3:
                    vcs.displayHistory();
                    break;
                case 4:
                    vcs.chooseUser();
                    break;
                case 5:
                    System.out.print("Enter branch name: ");
                    String newBranch = scanner.nextLine();
                    vcs.createBranch(newBranch);
                    break;
                case 6:
                    System.out.print("Enter branch name: ");
                    String deleteBranch = scanner.nextLine();
                    vcs.deleteBranch(deleteBranch);
                    break;
                case 7:
                    System.out.print("Enter branch name: ");
                    String checkoutBranch = scanner.nextLine();
                    vcs.checkoutBranch(checkoutBranch);
                    break;
                case 8:
                    System.out.print("Enter target branch name: ");
                    String mergeBranch = scanner.nextLine();
                    vcs.mergeBranches(mergeBranch);
                    break;
                case 9:
                    System.out.println("Exiting...");
                    scanner.close();
                    return;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }
}

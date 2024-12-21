package laba2;
import java.util.Scanner;

public class q7 {
    public static void main(String[] args){
        Scanner scanner = new Scanner(System.in);
        System.out.print("Сколько поездок?");
        int n = scanner.nextInt();

        int[] tickets = new int[5];
        tickets[4] = n/60;
        n-=tickets[4]*60;

        tickets[3]=n/20;
        n-=tickets[3]*20;

        tickets[2]=n/10;
        n-=tickets[2]*10;

        tickets[1]=n/5;
        n-=tickets[1]*5;

        tickets[0]=n;

        for (int i = 0; i < 5; i++) {
            System.out.print(tickets[i]+" ");
        }
    }
}

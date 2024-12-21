package laba2;
import java.util.Scanner;

public class q2 {
    public static void main(String[] args){
        Scanner scanner = new Scanner(System.in);
        System.out.print("Если вы введете эту сумму долларов:");
        double dollars = scanner.nextDouble();

        double pounds = dollars/1.487;
        double marks = dollars/0.584;
        double yen = dollars/0.00955;

        System.out.println("То вы получите:");
        System.out.printf("%.3f фунтов, ", pounds);
        System.out.printf("%.3f немецких марок ", marks);
        System.out.printf("и %.3f йен.", yen);
    }
}

package laba2;
import java.util.Scanner;

public class q14 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("¬ведите число ");
        int num = scanner.nextInt();
        if (num>0){
            System.out.println("sign(x) = 1");
        } else if (num<0){
            System.out.println("sign(x) = -1");
        } else if (num==0){
            System.out.println("sign(x) = 0");
        }
    }
}

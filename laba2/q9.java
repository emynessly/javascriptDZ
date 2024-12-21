package laba2;

import java.util.Scanner;

public class q9 {
    public static void main(String[] args){
        Scanner scanner = new Scanner(System.in);

        System.out.print("Напишите натуральное число ");
        int num = scanner.nextInt();
        int fact = 1;
        for(int i=1; i<=num; i++){
            fact *= i;
        }
        System.out.print("Факториал твоего числа равен ");
        System.out.print(fact);
    }
}

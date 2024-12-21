package laba2;

import java.util.Scanner;

public class q10 {
    public static void main(String[] args){
        Scanner scanner = new Scanner(System.in);

        System.out.print("Напишите натуральное число ");
        int num = scanner.nextInt();
        int sum = 0;
        while (num>0){
            int digit = num%10;
            sum+=digit;
            num/=10;
        }
        System.out.print("Сумма цифр твоего числа = ");
        System.out.print(sum);
    }
}

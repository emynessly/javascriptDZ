package laba2;
import java.util.Scanner;

public class q16 {
    public static void main(String[] args){
        Scanner scanner = new Scanner(System.in);
        System.out.println("Сколько шариков мороженого вы хотите взять? ");
        int scoop = scanner.nextInt();
        while (scoop>3 && scoop%3!=0){
            scoop-=5;
        }
        if((scoop>=3 && scoop%3==0)||(scoop==0)){
            System.out.println("YES");
        } else System.out.println("NO");
    }
}

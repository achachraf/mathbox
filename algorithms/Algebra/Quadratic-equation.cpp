#include<bits/stdc++.h>
using namespace std;
int main() {
    double a, b, c, x1, x2, discriminant, realPart, imaginaryPart;

    cin >> a >> b >> c;
    discriminant = b*b - 4*a*c;
 
    if (discriminant > 0) {
        x1 = (-b + sqrt(discriminant)) / (2*a);
        x2 = (-b - sqrt(discriminant)) / (2*a);
        cout << "x1 = " << x1 << endl;
        cout << "x2 = " << x2 << endl;
    }
 
    else if (discriminant == 0) {
        x1 = (-b + sqrt(discriminant)) / (2*a);
        cout << "x = " << x1 << endl;
    }
    else {
        realPart = -b/(2*a);
        imaginaryPart =sqrt(-discriminant)/(2*a);
        cout << "x1 = " << realPart << "+" << imaginaryPart << "i" << endl;
        cout << "x2 = " << realPart << "-" << imaginaryPart << "i" << endl;
    }
    return 0;
}

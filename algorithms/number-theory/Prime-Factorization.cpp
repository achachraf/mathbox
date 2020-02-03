#include <bits/stdc++.h>
using namespace std;
long long primeFactors(long long n)
{
    if (n % 2 == 0)
    {
        return 2;
    }
    for (long long i = 3; i <= sqrt(n); i = i + 2)
    {
        if (n % i == 0)
        {
            return i;
        }
    }
 
        return n;
}
int main()
{
    double n,x=-1,y=-1,comp=0;
    cin >> n;
    while(x!=n)
    {
        x=primeFactors(n);
        y=x;
 
        while(x==y)
        {
            comp++;
            n/=x;
            x=primeFactors(n);
        }
        if(comp!=1)
        cout <<y<<"^"<<comp<<"*";
        else
            cout << y <<"*";
        comp=0;
    }
    if(x!=1)
    cout << x;
    return 0;
}

#include<bits/stdc++.h>
using namespace std;

typedef long long ll;

ll gcd(int a,int b){
    if(!b) return a;
    return gcd(b,a%b);
}

int main(){
    ll a,b;
    cin>>a>>b;
    cout<<gcd(a,b);
}
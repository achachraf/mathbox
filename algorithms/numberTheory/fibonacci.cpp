#include<bits/stdc++.h>
using namespace std;

typedef long long ll;
const ll SIZE = 1E8 + 5;
ll DP[SIZE];

ll fibonacci(ll n,ll f0,ll f1){
    if(n == 0) return f0;
    if(n == 1) return f1;
    if(DP[n]) return DP[n];
    return DP[n] = fibonacci(n-1,f0,f1) + fibonacci(n-2,f0,f1);
}

int main(){
    ll n,f0,f1;
    cin>>n>>f0>>f1;
    DP[0] = f0;
    DP[1] = f1;
    cout<<fibonacci(n,f0,f1);

}
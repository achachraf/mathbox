#include<bits/stdc++.h>
using namespace std;

int main(){
    long long n,p,s=0;
    cin>>n>>p;
    for(int i=0;i<=n;i++){
        s += pow(i,p);
    }
    cout<<s<<endl;

}
#include<iostream>
#include<vector>
#include<unordered_map>
#include<queue>

using namespace std;

 
bool sequenceReconstruction(vector<int> &org, vector<vector<int>> &seqs) {
    // write your code here
    if (seqs.empty()) {
        return false;
    }
    int n = org.size();
    vector<vector<int>>graph(org.size()+1);
    vector<int>indegree(n+1, 0);
    vector<bool>visited(n+1, false);

    for(int i=0;i<seqs.size();i++){
        cout<<"heree"<<endl;
        for(int j=1;j<seqs[i].size();j++){
            cout<<"hree"<<endl;
            if(seqs[i][j-1] > n  ||  seqs[i][j-1] < 1  ||  seqs[i][j] > n  ||  seqs[i][j-1] < 1)
                return false;
            graph[seqs[i][j-1]].push_back(seqs[i][j]);
            indegree[seqs[i][j]]++;    
        }
    }

    for(int i=0;i<seqs.size();i++){

        for(int j=0;j<seqs[i].size();j++){
            cout<<"here"<<endl;
            visited[seqs[i][j]] = true;
        }
    }
    for(int i=1;i<n+1;i++){
        if(!visited[i]){
            cout<<"hello"<<endl;
            return false;
        }
    }
    queue<int>q;
    vector<int>ans;
    for(int i=1;i<n+1;i++){
        if(indegree[i] == 0){
            q.push(i);
        }
    }
    
    while(!q.empty()){
        int size = q.size();
        if(size > 1){
            return false;
        }
        int u = q.front();q.pop();
        ans.push_back(u);

        for(int i=0;i<graph[u].size();i++){
            int v = graph[u][i];
            indegree[v]--;
            if(indegree[v] == 0){
                q.push(v);
            }
        }
    }

    if(org.size() != ans.size())
        return false;
    for(int i=0;i<org.size();i++){
        if(org[i] != ans[i])
            return false;
    }

    return true;

}

int main(){
    vector<int>v1={};
    vector<vector<int>>v= {{}};
    cout<<sequenceReconstruction(v1, v);
}
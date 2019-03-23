---
title: "REACTO Series: K-Messed Array Sort"
cover: img/reacto.jpg
author: Sarah Zhao
tags: ["REACTO"]
image: img/reacto.jpg
date: "2018-11-23"
draft: false
---

## What's REACTO?

The interview process for software engineers often time requires the interviewee to stand in front of a white board and code out a solution to a prompt that is given to them by the interviewer. These interviews often require knowledge of Big O (time and space complexity), Data Structures, and Algorithms. REACTO is an approach to successfully conquer these interviews. It stands for:

- **R**epeat: Repeat the question back to the interviewer.
- **E**xamples: Give some example cases
- **A**pproach: Talk through your approach to solving the problem
- **C**ode: Code out a solution
- **T**est: Test the solution & edge cases
- **O**ptimize: Optimize while thinking about Big O

This series of posts will give you a problem to solve and an explanation of both the brute force & optimized solutions. We hope you enjoy!

## K-Messed Array Sort

### See [Repl](https://repl.it/@sarahzhao25/kMessedSortedArray)

## Prompt

Given an array of integers `arr` where each element is at most `k` places away from its sorted position, write a function `sortKMessedArray` that sorts `arr`.

## Example

For an input array of size 10 and k = 2, an element belonging to index 6 in the sorted array will be located at either index 4, 5, 6, 7 or 8 in the input array.

```js
let arr = [1, 4, 5, 2, 3, 7, 8, 6, 10, 9];
let k = 2;
sortKMessedArray(arr, k) //output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

## Approach

An initial approach would be to sort the array using mergeSort or JavaScript's sort method, in `nlog(n)` time. However, this would ignore that fact that the array is already mostly sorted (k-sorted), resulting in a less optimal solution.

Another approach utilizes the `k` values, by finding the minimum of the `k` values (a window of k values) in front of an element, and comparing its minimum to the element, swapping places if needed. This would be done in `O(nk)` time, since for every element in the n length array, you need to loop through `k` values to obtain the minimum. But we can do better.

`k` provides a plus/minus deviation from the actual index, providing `2k + 1` options for every element. However, if we can guarantee that the first index's value is sorted, then this becomes `k + 1` options for the next element. How can we guarantee that?

### 'Sliding Window' Sub-Array

The 1st number in the array can be in any position from 0 to k, since there are no negative indices. 

Consider a sub-array of that length, `k + 1`, filled with the first `k + 1` values in the array. You can sort the value into the first index correctly, since you know each element is within k indices of its final sorted index. We can then 'slide' the sub-array one index over and repeat to find the smallest element until the entire array has been traversed.

```js
const arr = [2,4,1,3];
const k = 2;

const window = [2,4,1]; //sub-array from index 0 of length K+1
//Sort the first index
window =  [1,2,4]

//Now slide the window down 1 index to the right.
window => [2,4,3]

//repeat until the full array is traversed

```

This problem requires the output to be a sorted array from smallest to largest. In order to assume that this window will always be able to sort the smallest value, *insertion into this array also needs to be 'sorted' from the beginning*.

### Binary Heap

A data structure that takes advantage of this insertion method is the `minimum heap`. Heaps are a data structure that, like regular binary trees, will take in data and insert the node in the tree based on comparisons to the other node's values. In a minimum heap, the node parent is always smaller than its children, resulting in the smallest value being at the top of the heap.

To apply this to the sliding window, we can create a minimum heap of size `k + 1`, and fill it with the first `k + 1` elements of the array. Once the heap is built, take the minimum (i.e. the node at the top of the heap) out and place that back into the original array. Slide your sub-array one index over, add that new value to the heap, and again remove the new minimum to place back into the array. Repeat the process until you have traversed the entire array.

To get the last elements out of the heap, the heap itself needs to be traversed to sort the remaining `k + 1` elements into the result array.

## Solution

### Sort Function

```js
function sortKMessedArray(arr, k) {
  let heapArr = new MinHeap();
  
  //iterate through the heapArr of k + 1 indices to guarantee the sorting of the *smallest* number.
  for (let i = 0; i <= k; i++) {
    heapArr.insert(arr[i]);
  }

  //iterate through the rest of the array and mutate the array from the beginning while changing the heap
  for (let i = k + 1; i < arr.length; i++) {
    arr[i - (k + 1)] = heapArr.popMin();
    heapArr.insert(arr[i]);
  }

  //iterate through the heap to sort the k + 1 remaining elements
  for (let i = k; i >= 0; i--) {
    arr[arr.length - 1 - i] = heapArr.popMin();
  }
  return arr;
}
```

### MinHeap Constructor

```js
function MinHeap() {
  this._heap = [];
}

MinHeap.prototype.getParent = function(childIdx) {
  return Math.floor((childIdx - 1) / 2);
}

MinHeap.prototype.insert = function(val) {
  this._heap.push(val);
  this.heapifyUp();
}

MinHeap.prototype.heapifyUp = function() {
  let currIdx = this._heap.length - 1;
  while (currIdx > 0 && this._heap[currIdx] < this._heap[this.getParent(currIdx)]) {
    this.swap(currIdx, this.getParent(currIdx));
    currIdx = this.getParent(currIdx);
  }
}

MinHeap.prototype.swap = function(idx1, idx2) {
  [this._heap[idx1], this._heap[idx2]] = [this._heap[idx2], this._heap[idx1]];
}

MinHeap.prototype.popMin = function() {
  let min = this._heap[0];
  let lastValue = this._heap.pop();
  if (this._heap[0]) this._heap[0] = lastValue;
  this.heapifyDown();
  return min;
}

MinHeap.prototype.heapifyDown = function() {
  let currIdx = 0;
  let [left, right] = this.getChildren(currIdx);
  let length = this._heap.length;
  //'left' would always be filled before right, so to guarantee you stay in the while loop
  while (left < length) {
    //if the right is ALSO filled
    let idxSmaller = left;
    if (right < length) {
      idxSmaller = this._heap[left] <= this._heap[right] ? left : right;
    }
    if (this._heap[idxSmaller] < this._heap[currIdx]) {
      this.swap(idxSmaller, currIdx);
      currIdx = idxSmaller;
      left = this.getChildren(currIdx)[0];
      right = this.getChildren(currIdx)[1];
    }
    else {
      return;
    }
  }
}

MinHeap.prototype.getChildren = function(parentIdx) {
  return [2 * parentIdx + 1, 2 * parentIdx + 2];
}
```

## Complexity

The time complexity taken here is `O(nlog(k))` time. Having to run through the array entirely requires `O(n)` time, and within each for-loop, inserting and deleting from a heap both take `O(log(k+1))` time, or `O(log(k))`, resulting in an `O(nlog(k))` time complexity.

The space complexity involved requires another array of length `k + 1`, or `O(k)` space complexity.

## Credit/Inspiration

This question is credited to PRAMP, with the heap constructor benefited from the priority queue REACTO problem from Fullstack Academy.

## References

[Priority Queue](https://github.com/FullstackAcademy/technical-interview-prep/blob/master/algorithms/3-data-structures/1-priority-queue.md)

[HeapSort](https://www.geeksforgeeks.org/heap-sort/)

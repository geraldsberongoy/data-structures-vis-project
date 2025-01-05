import React, { useState, useRef } from 'react';
import MarioTube from '../components/MarioComponent/MarioTubes.jsx';
import Modal from '../components/StackQueueModal/Modal.jsx';

const Sorting = () => {
  const [arr, setArr] = useState([]);
  const [prevArr, setPrevArr] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [comparing, setComparing] = useState([-1, -1]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [sortMethod, setSortMethod] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [delay, setDelay] = useState(500);
  const delayRef = useRef(delay);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = (message) => {
    setAlertMessage(message);
    setIsModalOpen(true);
  };

  const increaseDelay = () => {
    setDelay((prevDelay) => {
      const newDelay = prevDelay + 100;
      delayRef.current = newDelay;
      return newDelay;
    });
  };

  const decreaseDelay = () => {
    setDelay((prevDelay) => {
      const newDelay = prevDelay - 100;
      delayRef.current = newDelay;
      return newDelay;
    });
  };

  const bubbleSort = async (array) => {
    let arrCopy = [...array];
    let n = arrCopy.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setComparing([j, j + 1]);
        await new Promise((resolve) => setTimeout(resolve, delayRef.current)); // Adjust the delay as needed
        if (arrCopy[j] > arrCopy[j + 1]) {
          let temp = arrCopy[j];
          arrCopy[j] = arrCopy[j + 1];
          arrCopy[j + 1] = temp;
          setArr([...arrCopy]);
        }
        setComparing([-1, -1]);
        await new Promise((resolve) => setTimeout(resolve, delayRef.current)); // Adjust the delay as needed
      }
      setSortedIndices((prev) => [...prev, n - i - 1]);
    }
    setSortedIndices((prev) => [...prev, 0]);
    setComparing([-1, -1]);
    setIsSorting(false);
    setPrevArr([...array]);
    handleModalOpen('Bubble Sort Completed');
  };

  const selectionSort = async (array) => {
    let arrCopy = [...array];
    let n = arrCopy.length;
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        setComparing([minIndex, j]);
        await new Promise((resolve) => setTimeout(resolve, delayRef.current));
        if (arrCopy[j] < arrCopy[minIndex]) {
          minIndex = j;
        }
        await new Promise((resolve) => setTimeout(resolve, delayRef.current)); // Adjust the delay as needed
      }
      if (minIndex !== i) {
        let temp = arrCopy[i];
        arrCopy[i] = arrCopy[minIndex];
        arrCopy[minIndex] = temp;
        setArr([...arrCopy]);
      }
      setSortedIndices((prev) => [...prev, i]);
    }
    setSortedIndices((prev) => [...prev, n - 1]);
    setComparing([-1, -1]);
    setIsSorting(false);
    setPrevArr([...array]);
    handleModalOpen('Selection Sort Completed');
  };

  const insertionSort = async (array) => {
    let arrCopy = [...array];
    let n = arrCopy.length;
    for (let i = 1; i < n; i++) {
      let key = arrCopy[i];
      let j = i - 1;
      while (j >= 0 && arrCopy[j] > key) {
        setComparing([j, j + 1]);
        await new Promise((resolve) => setTimeout(resolve, delayRef.current));
        arrCopy[j + 1] = arrCopy[j];
        j = j - 1;
        setArr([...arrCopy]);
        await new Promise((resolve) => setTimeout(resolve, delayRef.current)); // Adjust the delay as needed
      }
      arrCopy[j + 1] = key;
      setArr([...arrCopy]);
      setSortedIndices((prev) => [...prev, i]);
    }
    setSortedIndices((prev) => [...prev, 0]);
    setComparing([-1, -1]);
    setIsSorting(false);
    setPrevArr([...array]);
    handleModalOpen('Insertion Sort Completed');
  };

  const mergeSort = async (array) => {
    let arrCopy = [...array];

    const merge = async (left, right) => {
      let result = [];
      let leftIndex = 0;
      let rightIndex = 0;

      while (leftIndex < left.length && rightIndex < right.length) {
        setComparing([leftIndex, rightIndex]);
        await new Promise((resolve) => setTimeout(resolve, delayRef.current)); // Adjust the delay as needed
        if (left[leftIndex] < right[rightIndex]) {
          result.push(left[leftIndex]);
          leftIndex++;
        } else {
          result.push(right[rightIndex]);
          rightIndex++;
        }
      }

      return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    };

    const mergeSortRecursive = async (arr) => {
      if (arr.length <= 1) {
        return arr;
      }

      const middle = Math.floor(arr.length / 2);
      const left = await mergeSortRecursive(arr.slice(0, middle));
      const right = await mergeSortRecursive(arr.slice(middle));

      const merged = await merge(left, right);
      setArr([...merged]);
      setSortedIndices((prev) => [...prev, ...Array.from({ length: merged.length }, (_, i) => i)]);
      return merged;
    };

    await mergeSortRecursive(arrCopy);
    setComparing([-1, -1]);
    setIsSorting(false);
    setPrevArr([...array]);
    handleModalOpen('Merge Sort Completed');
  };

  const shellSort = async (array) => {
    let arrCopy = [...array];
    let n = arrCopy.length;
    let gap = Math.floor(n / 2);

    while (gap > 0) {
      for (let i = gap; i < n; i++) {
        let temp = arrCopy[i];
        let j = i;
        while (j >= gap && arrCopy[j - gap] > temp) {
          setComparing([j, j - gap]);
          await new Promise((resolve) => setTimeout(resolve, delayRef.current));
          arrCopy[j] = arrCopy[j - gap];
          j -= gap;
          setArr([...arrCopy]);
          await new Promise((resolve) => setTimeout(resolve, delayRef.current)); // Adjust the delay as needed
        }
        arrCopy[j] = temp;
        setArr([...arrCopy]);
      }
      gap = Math.floor(gap / 2);
    }

    setSortedIndices((prev) => [...prev, ...Array.from({ length: n }, (_, i) => i)]);
    setComparing([-1, -1]);
    setIsSorting(false);
    setPrevArr([...array]);
    handleModalOpen('Shell Sort Completed');
  };

  const quickSort = async (array) => {
    let arrCopy = [...array];

    const partition = async (low, high) => {
      let pivot = arrCopy[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        setComparing([j, high]);
        await new Promise((resolve) => setTimeout(resolve, delayRef.current)); // Adjust the delay as needed
        if (arrCopy[j] < pivot) {
          i++;
          [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
          setArr([...arrCopy]);
        }
        setComparing([-1, -1]);
        await new Promise((resolve) => setTimeout(resolve, delayRef.current)); // Adjust the delay as needed
      }
      [arrCopy[i + 1], arrCopy[high]] = [arrCopy[high], arrCopy[i + 1]];
      setArr([...arrCopy]);
      return i + 1;
    };

    const quickSortRecursive = async (low, high) => {
      if (low < high) {
        let pi = await partition(low, high);
        await quickSortRecursive(low, pi - 1);
        await quickSortRecursive(pi + 1, high);
      }
    };

    await quickSortRecursive(0, arrCopy.length - 1);
    setSortedIndices((prev) => [...prev, ...Array.from({ length: arrCopy.length }, (_, i) => i)]);
    setComparing([-1, -1]);
    setIsSorting(false);
    setPrevArr([...array]);
    handleModalOpen('Quick Sort Completed');
  };

  const heapSort = async (array) => {
    let arrCopy = [...array];
    let n = arrCopy.length;

    const heapify = async (n, i) => {
      let largest = i;
      let left = 2 * i + 1;
      let right = 2 * i + 2;

      if (left < n && arrCopy[left] > arrCopy[largest]) {
        largest = left;
      }

      if (right < n && arrCopy[right] > arrCopy[largest]) {
        largest = right;
      }

      if (largest !== i) {
        setComparing([i, largest]);
        await new Promise((resolve) => setTimeout(resolve, delayRef.current)); // Adjust the delay as needed
        [arrCopy[i], arrCopy[largest]] = [arrCopy[largest], arrCopy[i]];
        setArr([...arrCopy]);
        await new Promise((resolve) => setTimeout(resolve, delayRef.current)); // Adjust the delay as needed
        await heapify(n, largest);
      }
    };

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      setComparing([0, i]);
      await new Promise((resolve) => setTimeout(resolve, delayRef.current)); // Adjust the delay as needed
      [arrCopy[0], arrCopy[i]] = [arrCopy[i], arrCopy[0]];
      setArr([...arrCopy]);
      await new Promise((resolve) => setTimeout(resolve, delayRef.current)); // Adjust the delay as needed
      await heapify(i, 0);
      setSortedIndices((prev) => [...prev, i]);
    }

    setSortedIndices((prev) => [...prev, 0]);
    setComparing([-1, -1]);
    setIsSorting(false);
    setPrevArr([...array]);
    handleModalOpen('Heap Sort Completed');
  };

  const handleSort = (sortType) => {
    setIsSorting(true);
    if (sortType === 'bubble') {
      bubbleSort(arr);
    } else if (sortType === 'selection') {
      selectionSort(arr);
    } else if (sortType === 'insertion') {
      insertionSort(arr);
    } else if (sortType === 'merge') {
      mergeSort(arr);
    } else if (sortType === 'shell') {
      shellSort(arr);
    } else if (sortType === 'quick') {
      quickSort(arr);
    } else if (sortType === 'heap') {
      heapSort(arr);
    }
  };

  const generateRandomArray = () => {
    const randomArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 50) + 1);
    setArr(randomArray);
    setPrevArr([]);
    setSortedIndices([]);
    setComparing([-1, -1]);
  };

  return (
    <div className='flex h-full bg-green-100 flex-col items-center gap-3'>
      {/* Array Section */}
      <div className='flex gap-2 pt-2'>
        <button
          onClick={generateRandomArray}
          className='p-2 bg-blue-500 text-white rounded'
        >
          Generate Random Array
        </button>
        <button
          onClick={decreaseDelay}
          className='p-2 bg-blue-500 text-white rounded'
        >
          Decrease Delay
        </button>
        <button
          onClick={increaseDelay}
          className='p-2 bg-blue-500 text-white rounded'
        >
          Increase Delay
        </button>
      </div>

      {/* Display Array */}
      <div className='flex gap-2 justify-center items-center w-full'>
        <p>Array:</p>
        {arr.map((num, index) => (
          <div key={index} className='p-2 bg-blue-500 text-white rounded'>
            {num}
          </div>
        ))}
        <p>Delay: {delay}</p>
      </div>

      {/* Button Section */}
      <div className='flex gap-2 justify-center items-center w-full bg-red-50'>
        <select
          className='p-2 h-full bg-blue-500 text-white rounded'
          disabled={isSorting}
          onChange={(e) => setSortMethod(e.target.value)}
        >
          <option value="" disabled selected>Select Sort Method</option>
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="merge">Merge Sort</option>
          <option value="shell">Shell Sort</option>
          <option value="quick">Quick Sort</option>
          <option value="heap">Heap Sort</option>
        </select>
        <button
          className='p-2 h-full bg-blue-500 text-white rounded'
          disabled={isSorting}
          onClick={() => handleSort(sortMethod)}
        >
          Sort
        </button>
        <button
          className='p-2 h-full bg-blue-500 text-white rounded'
          onClick={() => {
            setArr([...prevArr]);
            setPrevArr([]);
            setSortedIndices([]);
            setComparing([-1, -1]);
          }}
        >
          Revert Array
        </button>
      </div>

      {/* Sorting Section */}
      <div className="flex flex-grow items-end gap-2 bg-red-50 h-full w-full justify-center">
        {arr.map((num, index) => (
          <div key={index} className='flex flex-col items-center'>
            <MarioTube 
              height={num * 4.5} 
              comparing={comparing.includes(index)} 
              sorted={sortedIndices.includes(index)} />
            <p>{num}</p>
          </div>
        ))}
      </div>
      <Modal
        isModalOpen={isModalOpen}
        onClose={handleModalClose}
        alertMessage={alertMessage}
        mode="alert"
      />
    </div>
  );
};

export default Sorting;
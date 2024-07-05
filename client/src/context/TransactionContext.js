import { ethers } from "ethers";
import React, { createContext, useState } from "react";
import { contractABI, contractAddress } from "../utils/connect";
import { v4 as uuidv4 } from 'uuid';

//valueに入れた値を、このファイルをimportすれば別のコンポーネントでもその値が使えるやつ
export const TransactionContext = createContext();

//window.ethereumを短くする（window.etherの中のオブジェクトが丸っと代入される）（分割代入）
const { ethereum } = window;

//スマートコントラクトの取得
const getSmartContract = () => {
  // const provider = new ethers.BrowserProvider(ethereum);
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  // const [currentAccount, setCurrentAccount] = useState("");

  //メタマスクと連携
  const connectWallet = async () => {
    if(!ethereum) return alert("メタマスクをインストールしてください");

    //メタマスクを持っていれば接続を開始する
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts[0]);
    // setCurrentAccount(accounts[0]);
  };

  //Todo新規登録
  const createTodo = async (newTodo) => {
    const newTodoId = uuidv4();
    const transactionContract = getSmartContract();
    const provider = new ethers.providers.Web3Provider(ethereum);
    const transaction = await transactionContract.createTodo(newTodoId, newTodo, 'running');

    // トランザクションの確定を待つ
    await provider.waitForTransaction(transaction.hash);

    console.log('create todos:', transaction);
    // console.log('Transaction Hash:', transaction.hash);
  };

  //全てのTodo取得
  const selectAllTodos = async () => {
    const transactionContract = getSmartContract();
    const transaction = await transactionContract.selectAllTodos();
    console.log('all todos todos:', transaction);
  }

  //進行中Todo取得
  const selectAllRunningTodos = async () => {
    const transactionContract = getSmartContract();
    const transaction = await transactionContract.selectAllRunningTodos();
    console.log('running todos:', transaction);
    return transaction;
  }

  //完了済Todo取得
  const selectAllCompleteTodos = async () => {
    const transactionContract = getSmartContract();
    const transaction = await transactionContract.selectAllCompleteTodos();
    console.log('complete todos:', transaction);
    return transaction;
  }

  // Todoの削除
  const deleteTodoById = async (id) => {
    const transactionContract = getSmartContract();
    const provider = new ethers.providers.Web3Provider(ethereum);
    const transaction = await transactionContract.deleteTodoById(id);

    // トランザクションの確定を待つ
    await provider.waitForTransaction(transaction.hash);

    console.log('delete todos:', transaction);
  }

  //ステータスの更新
  const changeTodoById = async (id) => {
    const transactionContract = getSmartContract();
    const provider = new ethers.providers.Web3Provider(ethereum);
    const transaction = await transactionContract.changeTodoById(id);

    // トランザクションの確定を待つ
    await provider.waitForTransaction(transaction.hash);

    console.log('change todos:', transaction);
  }

  return (
    <TransactionContext.Provider value={{ 
      connectWallet, 
      createTodo, 
      selectAllTodos,
      selectAllRunningTodos,
      selectAllCompleteTodos,
      deleteTodoById,
      changeTodoById,  
      }}>
      {children}
    </TransactionContext.Provider>
  );
};
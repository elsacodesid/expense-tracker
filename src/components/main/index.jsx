import { Flex, Heading, Button, useDisclosure } from "@chakra-ui/react";
import Summary from "../summary";
import ExpenseView from "../expense-view";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";

export default function Main() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    totalExpense,
    setTotalExpense,
    totalIncome,
    setTotalIncome,
    allTransactions,
  } = useContext(GlobalContext);

  useEffect(() => {
    let income = 0;
    let expense = 0;

    allTransactions.forEach((transaction) =>
      transaction.type === "income"
        ? (income = income + parseFloat(transaction.amount))
        : (expense = expense + parseFloat(transaction.amount))
    );

    setTotalExpense(expense);
    setTotalIncome(income);
  }, [allTransactions, setTotalExpense, setTotalIncome]);

  return (
    <Flex textAlign={"center"} flexDirection={"column"} pr={"5"} pl={"5"}>
      <Flex alignItems={"center"} justifyContent={"space-between"} mt={"12"}>
        <Heading
          color={"blue.400"}
          display={["none", "block", "block", "block", "block"]}
        >
          Expense Tracker
        </Heading>
        <Flex alignItems={"center"}>
          <Button onClick={onOpen} bg={"blue.300"} color={"black"} ml={"4"}>
            Add New Transaction
          </Button>
        </Flex>
        <Flex></Flex>
      </Flex>
      <Summary
        totalExpense={totalExpense}
        totalIncome={totalIncome}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Flex
        w={"full"}
        alignItems={"flex-start"}
        justifyContent={"space-evenly"}
        flexDirection={["column", "column", "column", "row", "row"]}
      >
        <ExpenseView data={allTransactions.filter(transaction=>transaction.type === "expense")} type={"expense"} />
        <ExpenseView data={allTransactions.filter(transaction=>transaction.type === "income")} type={"income "} />
      </Flex>
    </Flex>
  );
}

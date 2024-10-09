interface DataType {
   token: string;
   data: number[];
   query: {
      type: "1" | "2";
      range: { l: number; r: number };
   }[];
}

let response: DataType | undefined = undefined;
// Em dùng thuật toán prefix sum
let arrSum: number[] = [];
let arrEvenSum: number[] = [];
let arrOddSum: number[] = [];

const init = () => {
   if (!response) {
      return;
   }
   const length = response?.data.length || 0;

   for (let i = 0; i < length; i++) {
      arrSum[i] = response?.data[i] + (i !== 0 ? arrSum[i - 1] : response?.data[i]);
      arrEvenSum[i] = (i % 2 === 0 ? response?.data[i] : 0) + (i !== 0 ? arrEvenSum[i - 1] : 0)
      arrOddSum[i] = (i % 2 !== 0 ? response?.data[i] : 0) + (i !== 0 ? arrOddSum[i - 1] : 0)
   }
}


const handleType1 = (l: number, r: number): number => {
   return l > 0 ? arrSum[r] - arrSum[l - 1] : arrSum[r];
};

const handleType2 = (l: number, r: number): number => {
   let evenSum = l > 0 ? arrEvenSum[r] - arrEvenSum[l - 1] : arrEvenSum[r];
   let oddSum = l > 0 ? arrOddSum[r] - arrOddSum[l - 1] : arrOddSum[r];
   return evenSum - oddSum;
}

async function main() {
   // Lâys data về
   const res = await fetch("https://test-share.shub.edu.vn/api/intern-test/input", { method: "GET" });
   const jsonResponse = await res.json();
   response = jsonResponse;

   if (!response) {
      console.error("No data");
      return
   }

   init();

   let arrResult: number[] = [];

   response?.query.forEach(q => {
      let result = 0;
      if (q.type === "1") {
         result = handleType1(q.range[0], q.range[1]);
      } else if (q.type === "2") {
         result = handleType2(q.range[0], q.range[1]);
      }
      arrResult.push(result);
   })

   // Gửi kết quả lên sv
   fetch("https://test-share.shub.edu.vn/api/intern-test/output", {
      method: "POST",
      headers: {
         'Content-Type': 'application/json',
         "Authorization": `Bearer ${response.token}`,
      },
      body: JSON.stringify(arrResult)
   })
}

main();
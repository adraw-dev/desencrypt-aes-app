import { Button } from "@heroui/button";
import CryptoJS from "crypto-js";
import { useState } from "react";

import JsonView from "@uiw/react-json-view";
function App() {
  const [key, setKey] = useState("");
  const [iv, setIv] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [result, setResult] = useState({});

  const handleDecrypt = () => {
    try {
      const keyBytes = CryptoJS.enc.Hex.parse(key.trim());
      const ivBytes = CryptoJS.enc.Hex.parse(iv.trim());

      const decrypted = CryptoJS.AES.decrypt(ciphertext.trim(), keyBytes, {
        iv: ivBytes,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      const plainText = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));

      setResult(
        plainText || "⚠️ No se pudo desencriptar (clave/iv incorrectos)",
      );
    } catch (error) {
      console.error(error);
      setResult("❌ Error al desencriptar");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(to bottom, #0d47a1, #64b5f6)" }}
    >
      <div className="bg-white my-10 w-11/12 md:w-3/4 lg:w-2/3 p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          AES256 Decryptor 🔑
        </h1>

        <div className="flex flex-col  space-y-4 gap-5">
          <input
            type="text"
            placeholder="Encryption Key (hex)"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full mb-5 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="IV (hex)"
            value={iv}
            onChange={(e) => setIv(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            placeholder="Ciphertext (Base64)"
            value={ciphertext}
            onChange={(e) => setCiphertext(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 h-24 resize-none"
          />
          <Button
            onPress={handleDecrypt}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition"
          >
            Desencriptar
          </Button>
        </div>

        <div className="mt-6">
          <h2 className="font-semibold">Resultado:</h2>
          <div className="mt-2 p-3 bg-gray-100 rounded ">
            <JsonView value={result} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

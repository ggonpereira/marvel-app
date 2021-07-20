import React from 'react'

export default function Input({ inputFunc, buttonFunc, type, id }) {
  return (
    <div className="input-group">
      <input onChange={inputFunc} placeholder={`Busque pelo ID... Ex: ${type === "characters" ? "1009257" : "345"}`} />
      <button onClick={() => buttonFunc(type, id)}>Buscar</button>
    </div>
  )
}

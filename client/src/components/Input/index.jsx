import React from 'react'

export default function Input({ inputFunc, buttonFunc, type, id }) {
  return (
    <div className="input-group">
      <input onChange={inputFunc} placeholder="Digite algo para buscar..." />
      <button onClick={() => buttonFunc(type, id)}>Buscar</button>
    </div>
  )
}

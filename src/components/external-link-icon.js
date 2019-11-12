import React from "react"

const ExternalLinkIcon = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    viewBox="0 0 16 16"
    style={style || {}}
  >
    <path
      fill="currentColor"
      fill-rule="nonzero"
      d="M16 1.714v12.572c0 .947-.768 1.714-1.714 1.714H1.714A1.714 1.714 0 0 1 0 14.286V1.714C0 .767.767 0 1.714 0h12.572C15.233 0 16 .767 16 1.714zm-3.143.572H8.858c-.761 0-1.146.923-.606 1.463l1.142 1.142-6.983 6.983a.429.429 0 0 0 0 .607l1.108 1.108a.429.429 0 0 0 .607 0l6.983-6.983 1.142 1.142c.537.537 1.463.16 1.463-.606v-4a.857.857 0 0 0-.857-.856z"
    />
  </svg>
)

export default ExternalLinkIcon

package com.sastit

import kotlinx.serialization.Serializable

@Serializable
data class D(
  val name: String,
  val id: String,
  val danmu: String,
)

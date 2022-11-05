package com.sastit

object ContainerWrapper {
  private val container: ArrayDeque<String> = ArrayDeque(20)

  fun getInstance(): ArrayDeque<String> = container
}

package com.sastit

object ContainerWrapper {
  private val container: ArrayDeque<D> = ArrayDeque(20)

  fun getInstance(): ArrayDeque<D> = container
}

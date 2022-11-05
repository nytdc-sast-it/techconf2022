package com.sastit.plugins

import com.sastit.ContainerWrapper
import io.ktor.server.application.Application
import io.ktor.server.application.install
import io.ktor.server.routing.routing
import io.ktor.server.websocket.WebSockets
import io.ktor.server.websocket.pingPeriod
import io.ktor.server.websocket.timeout
import io.ktor.server.websocket.webSocket
import io.ktor.websocket.Frame
import io.ktor.websocket.readText
import java.time.Duration
import org.slf4j.Logger
import org.slf4j.LoggerFactory

val container = ContainerWrapper.getInstance()
val logger: Logger = LoggerFactory.getLogger(Application::class.java)

fun Application.configureSockets() {
  install(WebSockets) {
    pingPeriod = Duration.ofSeconds(15)
    timeout = Duration.ofSeconds(15)
    maxFrameSize = Long.MAX_VALUE
    masking = false
  }

  routing {
    webSocket("/ws") { // websocketSession
      for (frame in incoming) {
        if (frame is Frame.Text) {
          val text = frame.readText()
          if (container.size == 20) container.removeLast()
          container.addFirst(text)
          logger.info("Received: $text")
          logger.info("Sent: $text")
          outgoing.send(Frame.Text(text))
        }
      }
    }
  }
}

package com.sastit.plugins

import com.sastit.ContainerWrapper
import com.sastit.D
import io.ktor.server.application.Application
import io.ktor.server.application.install
import io.ktor.server.routing.routing
import io.ktor.server.websocket.WebSockets
import io.ktor.server.websocket.pingPeriod
import io.ktor.server.websocket.timeout
import io.ktor.server.websocket.webSocket
import io.ktor.util.logging.error
import io.ktor.websocket.DefaultWebSocketSession
import io.ktor.websocket.Frame
import io.ktor.websocket.readText
import io.ktor.websocket.send
import java.time.Duration
import java.util.Collections
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
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
    val connections = Collections.synchronizedSet<DefaultWebSocketSession?>(LinkedHashSet())
    webSocket("/ws") { // websocketSession
      connections += this
      try {
        for (frame in incoming) {
          if (frame is Frame.Text) {
            val text = frame.readText()
            // deserialize text to object
            val d = Json.decodeFromString<D>(text)
            synchronized(container) {
              if (container.size == 20) container.removeLast()
              container.addFirst(d)
            }
            logger.info("Received: $d")
            logger.info("Sent: $d")
            connections.forEach {
              it.send(Json.encodeToString(d))
            }
          }
        }
      } catch (ignored: Exception) {
        logger.error(ignored)
      } finally {
        logger.info("Removing $this!")
        connections -= this
      }
    }
  }
}
